import Router from "next/router";
import { useEffect, useRef, useState, forwardRef } from "react";
import styles from "@styles/Modal.module.scss";
import { closeModal } from "@utils";

const AddModal = forwardRef<HTMLDialogElement, Record<string, unknown>>(
  (_, ref) => {
    const [label, setLabel] = useState("");
    const [url, setUrl] = useState("");
    const localRef = useRef<HTMLDialogElement | null>(null);

    const submitData = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        const body = { label, url };
        await fetch("/api/myphotos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
      } catch (error) {
        console.error(error);
      }
      closeModal(localRef, resetState);
      Router.reload();
    };

    const resetState = () => {
      setLabel("");
      setUrl("");
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
            autoComplete="off"
            id="label"
            autoFocus
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Set the photo label"
            type="text"
            value={label}
          />
          <label htmlFor="url">Photo URL</label>
          <input
            autoComplete="off"
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
              onClick={(e) => {
                e.preventDefault();
                closeModal(localRef, resetState);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    );
  }
);

export default AddModal;
