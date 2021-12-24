import { fr } from 'date-fns/locale';

// MUI IMPORT
import { TextField } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';

// COMPONENT IMPORTS
import PasswordInput from '../ui/password-input';

export default function FormField({ type, id, label, required, value, dateConfig, passwordConfig, handleChange, error }) {
  // Define error as a bool for MUI error prop 
  const booleanError = error === false ? false : true;

  // Conditional rendering of form field
  switch (type) {
    case 'date':
      return (
        <LocalizationProvider dateAdapter={DateAdapter} locale={fr}>
          <DatePicker
            disableFuture={dateConfig?.disableFuture}
            clearable={dateConfig?.clearable}
            errorText={booleanError}
            id={id}
            label={label}
            openTo={dateConfig?.openTo || 'month'}
            views={dateConfig?.views || ['year', 'month', 'day']}
            value={value || new Date()}
            onChange={(newValue) => {
              handleChange({
                target: {
                  id,
                  value: newValue,
                },
              });
            }}
            renderInput={(params) => <TextField label="Date" {...params} />}
          />
        </LocalizationProvider>
      );

    case 'password':
      return (
        <PasswordInput label={label} value={value} name={id} handleChange={handleChange} error={error !== ''} helperText={error} confirm={passwordConfig?.confirm} required={required} />
      )

    default:
      return (
        <TextField id={id} label={label} variant="outlined" value={value} onChange={handleChange} error={booleanError} helperText={error} required={required} />
      )
  }
}
