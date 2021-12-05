import {
  DateTime,
  Default,
  Id,
  Model,
  OneToMany,
  Property,
  Unique,
  UpdatedAt,
} from "decotix";
import { SignupMethodEnum, SignupMethodType } from "~/enums/SignupMethod.enum";
import { SocialConnection } from "./SocialConnection.model";
import { TokenCluster } from "./TokenCluster.model";

@Model()
export class User {
  @Property(() => String)
  @Id("uuid")
  id: string;

  @Default("now")
  @Property(() => DateTime)
  createdAt: Date;

  @UpdatedAt()
  @Property(() => DateTime)
  updatedAt: Date;

  /** The users unique, human-readable identifier on the platform */
  @Unique()
  @Property(() => String)
  username: string;

  /** The method this user used to sign up (Email/Oauth) */
  @Property(() => SignupMethodEnum)
  signupMethod: SignupMethodType;

  /** If the user has verified their email address */
  @Property(() => Boolean, { nullable: true })
  isVerified?: boolean;

  /** 
     * The users email address
     
     * If oauth - email is taken from oauth provider
     */
  @Unique()
  @Property(() => String)
  email: string;

  /** 
     * The users password 
     
     * User might be registered via oauth as well, therefore it's a nullable field 
     */
  @Property(() => String, { nullable: true })
  password?: string;

  /** The users connected social accounts */
  @OneToMany(() => SocialConnection, (a) => a.user)
  socialConnections: SocialConnection[];

  /** The users access and refresh token pairs */
  @OneToMany(() => TokenCluster, (a) => a.user)
  tokenClusters: TokenCluster[];
}
