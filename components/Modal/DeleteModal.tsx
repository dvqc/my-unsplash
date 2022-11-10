import Router from "next/router";
import { useEffect, useRef, forwardRef } from "react";
import styles from "@styles/Modal.module.scss";
import { closeModal } from "@utils";

const DeleteModal = forwardRef<HTMLDialogElement, { id: string }>(
  ({ id }, ref) => {
    const localRef = useRef<HTMLDialogElement | null>(null);

    const submitData = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        await fetch("/api/myphotos/" + id, {
          method: "DELETE"
        });
      } catch (error) {
        console.error(error);
      }
      closeModal(localRef, () => {
        return;
      });
      Router.reload();
    };

    useEffect(() => {
      if (typeof ref != "function" && ref?.current)
        localRef.current = ref?.current;
    }, [ref]);

    return (
      <dialog ref={ref} className={styles["modal"]}>
        <form onSubmit={submitData}>
          <h2>Are you sure you want to delete this photo?</h2>
          <div>
            <input className={styles["delete"]} type="submit" value="Delete" />
            <button
              onClick={(e) => {
                e.preventDefault();
                closeModal(localRef, () => {
                  return;
                });
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

export default DeleteModal;
