import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IdCard, Smartphone } from "lucide-react";

const loginSchema = z.object({
  aadhar: z.string().regex(/^\d{12}$/, "Aadhaar must be exactly 12 digits"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      aadhar: "",
      mobile: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center gap-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription className="font-medium text-base">
            Patient Login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="aadhar"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Field>
                    <FieldLabel>Aadhaar Number</FieldLabel>
                    <InputGroup>
                      <InputGroupInput {...field} placeholder="123456789012" />
                      <InputGroupAddon>
                        <IdCard />
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldError className="-mt-2">{error?.message}</FieldError>
                  </Field>
                )}
              />

              <Controller
                name="mobile"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Field>
                    <FieldLabel>Mobile Number</FieldLabel>
                    <InputGroup>
                      <InputGroupInput {...field} placeholder="9876543210" />
                      <InputGroupAddon>
                        <Smartphone />
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldError className="-mt-2">{error?.message}</FieldError>
                  </Field>
                )}
              />

              <Field>
                <Button type="submit" className="w-full cursor-pointer">
                  Login
                </Button>
                <FieldDescription className="text-center">
                  OTP will be sent to your mobile number
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <span className="underline underline-offset-2">Terms of Service</span>{" "}
        and <span className="underline underline-offset-2">Privacy Policy</span>
        .
      </FieldDescription>
    </div>
  );
};

export default LoginForm;
