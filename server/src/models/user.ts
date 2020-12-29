import mongoose, { Schema, Model, Document } from "mongoose";
import { PasswordManager } from "../services/password-manager";
import { applyIdTransform } from "../util/formatDocId";

// describes the attributes needed to construct a user
interface UserAttributes {
  email: string;
  name: string;
  password: string;
}

// describes the properties that a user document has
interface UserDocument extends UserAttributes, Document {}

// describes properties that a User Model has
interface UserModel extends Model<UserDocument> {
  build(attributes: UserAttributes): UserDocument;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toObject: {
      transform(doc, ret) {
        delete ret.password;
        return applyIdTransform(ret);
      },
      versionKey: false, // remove __v property
    },
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return applyIdTransform(ret);
      },
      versionKey: false, // remove __v property
    },
  }
);

UserSchema.index({ location: "2dsphere" });

// this method ensures we always provide the correct attributes before passing it to the User constructor
UserSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

// hash password whenever it is set
UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await PasswordManager.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  done();
});

const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);

export { User, UserAttributes, UserDocument };
