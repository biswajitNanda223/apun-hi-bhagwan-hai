export type UserProps = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(props: UserProps): User {
    if (!props.email.includes('@')) {
      throw new Error('Invalid email address.');
    }

    if (props.name.trim().length < 2) {
      throw new Error('User name must contain at least two characters.');
    }

    return new User({
      ...props,
      email: props.email.toLowerCase(),
      name: props.name.trim(),
    });
  }

  toJSON(): UserProps {
    return { ...this.props };
  }
}
