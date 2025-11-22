import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LoginCard = () => {
  return (
    <Card className="w-full max-w-md shadow-lg shadow-accent">
      <CardContent>
        <FieldSet className="w-full max-w-md ">
          <Field>
            <FieldLabel htmlFor="username">Username:</FieldLabel>
            <Input id="username" type="text" placeholder="John Doe" />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password:</FieldLabel>
            <Input id="password" type="password" placeholder="••••••••" />
          </Field>
          <Field className="w-full">
            <Button type="submit">Login</Button>
            <p className="text-center">or</p>
            <Button variant="outline">Signup</Button>
          </Field>
        </FieldSet>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
