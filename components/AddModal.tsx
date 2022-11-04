import { useEffect, useRef, useState, forwardRef } from "react";
import styles from "../styles/Modal.module.scss";
import { afterAnimation } from "../utils";

const AddModal = forwardRef<HTMLDialogElement, {}>(({}, ref) => {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const localRef = useRef<HTMLDialogElement | null>(null);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (typeof ref != "function" && ref?.current)
      localRef.current = ref?.current;
  }, [ref]);

  return (
    <dialog ref={ref} className={styles["modal"]}>
      <form onSubmit={submitData}>
        <h2>Add a new photo</h2>
        <label htmlFor="label">Label</label>
        <input
          id="label"
          autoFocus
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Set the photo label"
          type="text"
          value={label}
        />
        <label htmlFor="url">Photo URL</label>
        <input
          id="url"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Set the photo url"
          value={url}
        />
        <div>
          <input
            className={styles["submit"]}
            disabled={!label || !url}
            type="submit"
            value="Submit"
          />
          <button
            onClick={() => {
              localRef.current?.setAttribute("closing", "");
              afterAnimation(localRef, () => {
                localRef.current?.removeAttribute("closing");
                localRef.current?.close();
              });
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default AddModal;
