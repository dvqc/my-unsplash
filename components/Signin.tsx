import styles from "@styles/Signin.module.scss";
import { signIn } from "next-auth/react";

const Signin = () => {
  return (
    <div className={styles["signin-container"]}>
      <div className={styles["signin-card"]}>
        <h1>Please sign in to continue</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    </div>
  );
};

export default Signin;
