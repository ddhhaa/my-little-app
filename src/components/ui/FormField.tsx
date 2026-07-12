import styles from "../../styles/FormField.module.scss";

type FormFieldProps = {
  children: React.ReactNode;
  error?: string;
};

function FormField({ children, error }: FormFieldProps) {
  return (
    <div className={styles.field}>
      {children}

      {error && (
        <p className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;