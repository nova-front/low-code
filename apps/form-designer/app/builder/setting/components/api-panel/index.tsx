import { TextField, Grid2 as Grid, Tooltip, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ApiPanelProps } from '../../type';

const ApiPanel = (props: ApiPanelProps) => {
  const { value, index, data, onUpdate, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={12}>
            <TextField
              fullWidth
              label={
                <>
                  Property Name
                  <Tooltip
                    placement="right-start"
                    title="The name of this field in the API endpoint.【key: abc】"
                  >
                    <IconButton>
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </>
              }
              variant="outlined"
              value={data.key}
              onChange={(e: any) => onUpdate?.('key', e.target.value)}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ApiPanel;
