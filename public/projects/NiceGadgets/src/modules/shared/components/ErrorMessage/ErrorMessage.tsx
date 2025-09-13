import globalStyles from '../../globalStyles.module.scss';

type Props = {
  error: string;
};

export const ErrorMessage: React.FC<Props> = ({ error }) => (
  <div className={globalStyles.error_container}>
    <p className={globalStyles.error}>{error}</p>
    <button
      className={globalStyles.error_button}
      onClick={() => window.location.reload()}
    >
      Reload
    </button>
  </div>
);
