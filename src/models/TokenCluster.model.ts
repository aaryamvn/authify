import {
  DateTime,
  Default,
  Id,
  ManyToOne,
  Model,
  Property,
  Unique,
  UpdatedAt,
} from "decotix";
import { User } from "./User.model";

@Model()
export class TokenCluster {
  @Property(() => String)
  @Id("uuid")
  id: string;

  @Default("now")
  @Property(() => DateTime)
  createdAt: Date;

  @UpdatedAt()
  @Property(() => DateTime)
  updatedAt: Date;

  @Unique()
  @Property(() => String)
  accessToken: string;

  @Unique()
  @Property(() => String)
  refreshToken: string;

  @ManyToOne(() => User, (a) => a.tokenClusters)
  user: User;
}
