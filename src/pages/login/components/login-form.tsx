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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSendOtp, useVerifyOtp } from "@/services/query/login/login.api";
import {
  loginSchema,
  type LoginFormValues,
} from "@/validations/login/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { IdCard, Smartphone } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: sendOtp, isPending: isSendingOtp } = useSendOtp();
  const { mutateAsync: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp();

  const { control, handleSubmit, setValue, reset } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      aadhar: "",
      mobile: "",
      otp: "",
      otpSent: false,
      txnId: "",
    },
  });
  const otpSent = useWatch({ control, name: "otpSent" });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      if (!data.otpSent) {
        const res = await sendOtp({
          aadhaar_number: data.aadhar,
          mobile: data.mobile,
        });

        setValue("txnId", res.txn_id);
        setValue("otpSent", true);
        return;
      }

      if (data.otpSent && data.otp && data.txnId) {
        await verifyOtp({
          mobile: data.mobile,
          otp: data.otp,
          txn_id: data.txnId,
        });

        reset();
        navigate("/dashboard");
        return;
      }
    } catch (error) {
      console.error(error);
    }
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

              {otpSent && (
                <Controller
                  name="otp"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Field>
                      <FieldLabel htmlFor="otp-verification">
                        Verification code
                      </FieldLabel>
                      <InputOTP
                        autoFocus
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup className="*:flex-1 w-full">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      <FieldError className="-mt-2">
                        {error?.message}
                      </FieldError>
                    </Field>
                  )}
                />
              )}

              <Field>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  loading={isSendingOtp || isVerifyingOtp}
                  disabled={isSendingOtp || isVerifyingOtp}
                >
                  {otpSent ? "Login" : "Generate OTP"}
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
      </FieldDescription>
    </div>
  );
};

export default LoginForm;
