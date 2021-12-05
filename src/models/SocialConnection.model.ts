import {
  DateTime,
  Default,
  Id,
  ManyToOne,
  Model,
  Property,
  UpdatedAt,
} from "decotix";

import { User } from "./User.model";
import {
  SocialProviderEnum,
  SocialProviderType,
} from "~/enums/SocialProvider.enum";

@Model()
export class SocialConnection {
  @Property(() => String)
  @Id("uuid")
  id: string;

  @Default("now")
  @Property(() => DateTime)
  createdAt: Date;

  @UpdatedAt()
  @Property(() => DateTime)
  updatedAt: Date;

  @Property(() => SocialProviderEnum)
  provider: SocialProviderType;

  @Property(() => String)
  providerEmail: string;

  @Property(() => String)
  providerUsername: string;

  @Property(() => String)
  providerUserId: string;

  /** Is this social connection also what the user used as an oauth provider to register on the platform */
  @Property(() => Boolean)
  isRegistrationConnection: boolean;

  @ManyToOne(() => User, (a) => a.socialConnections)
  user: User;
}
