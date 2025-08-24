export type RoomParams = {
  code: string;
};

export type RoomPageProps = {
  params: RoomParams;
};

export type UsersParams = {
  id: string;
};

export type UsersPageProps = {
  params: UsersParams;
};

export type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
} & Record<string, any>;
