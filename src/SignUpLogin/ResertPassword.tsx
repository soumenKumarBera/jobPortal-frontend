import { useDisclosure, useInterval } from "@mantine/hooks";
import {
  Modal,
  Button,
  TextInput,
  PinInput,
  PasswordInput,
} from "@mantine/core";
import { AtIcon, LockIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../Servicess/UserServices";
import { SignupValidation } from "../Servicess/FormValidetion";
import {
  errorNotification,
  successNotification,
} from "../Servicess/NotificationService";

const ResertPassword = (props: any) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);

  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [resendinLodeing, setResendLodeing] = useState(false);
  

  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLodeing(false);
      setSeconds(60);
      interval.stop();
    } else {
      setSeconds((s) => s - 1);
    }
  }, 1000);

  const handleSendOtp = () => {
    // Implement the logic to send OTP here
    setOtpSending(true);
   

    sendOtp(email)
      .then((response) => {
        console.log(response);

        setTimeout(() => {
          setOtpSending(false);
       
          setOtpSent(true);
          setResendLodeing(true);
          interval.start();
          successNotification("OTP Sent Successfully", "Enter OTP to reset");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);

        setTimeout(() => {
          setOtpSending(false);
        
          errorNotification(
            "OTP Sendig Failed",
            error.response.data.errorMessage,
          );
        }, 3000);
      });
  };

  const handelVerifyOtp = (otp: string) => {
    verifyOtp(email, otp)
      .then((response) => {
        console.log(response);
        setVerified(true);
        successNotification("OTP Verified", "Enter new Password");
        // Handle successful OTP verification here
      })
      .catch((error) => {
        console.error(error);
        // Handle OTP verification error here
        errorNotification(
          "OTP Verified Failed",
          error.response.data.errorMessage,
        );
      });
  };

  const resendOtp = () => {
    if(resendinLodeing) return;
    handleSendOtp();
  };

  const changeEmail = () => {
    setOtpSent(false);
    setEmail("");
  };




  const handelResetPassword = () => {
    changePass(email, password)
      .then((res) => {
        successNotification("Password Change", "Login with new password.");
        props.close();
      })
      .catch((err) => {
        errorNotification(
          "Password Resert Failed",
          err.response.data.errorMessage,
        );
      });
  };

  return (
    <Modal opened={props.opened } onClose={props.close}  title="Reset Password">
      
      <div className="flex flex-col gap-6">
        <TextInput
          size="md"
          withAsterisk
          leftSection={<AtIcon size={16} />}
          label="Your email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          rightSection={
            <Button
              variant="filled"
              size="xs"
              className="mr-1"
              disabled={!email || otpSent}
              loading={otpSending && !otpSent}
              autoContrast
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
          }
          rightSectionWidth="xl"
        />
        {otpSent && (
          <PinInput
            length={6}
            type="number"
            onComplete={handelVerifyOtp}
            className="mx-auto"
            size="md"
            gap="lg"
          />
        )}
        {otpSent && !verified && (
          <div className="flex gap-2">
            <Button
              variant="light"
              loading={otpSending}
              autoContrast
              onClick={resendOtp}
              fullWidth
            >
              {resendinLodeing ? seconds : "Resend"}
            </Button>
            <Button
              variant="filled"
              autoContrast
              onClick={changeEmail}
              fullWidth
            >
              ChangeEmail
            </Button>
          </div>
        )}

        {verified && (
          <PasswordInput
            leftSection={<LockIcon size={18} />}
            label="New Password"
            withAsterisk
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPassError(SignupValidation("password", e.target.value));
            }}
            name="password"
            error={passError}
          />
        )}

        {verified && (
          <Button variant="filled" autoContrast onClick={handelResetPassword}>
            Reset Password
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ResertPassword;
