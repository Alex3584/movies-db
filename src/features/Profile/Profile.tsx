import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Box,
  Container,
  Stack,
  Typography,
  Paper,
  Divider,
  Chip,
} from "@mui/material";

export function Profile() {
  const { user } = useAuth0();

  if (!user) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Stack direction="column" spacing={3} alignItems="center">
          <Avatar
            src={user.picture}
            sx={{ width: 100, height: 100, border: "3px solid #1976d2" }}
          />
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.email}
            </Typography>
            <Chip
              label={user.email_verified ? "Email Verified" : "Email Not Verified"}
              color={user.email_verified ? "success" : "warning"}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Technical Info
          </Typography>
          <Box
            component="pre"
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              p: 2,
              overflowX: "auto",
              fontSize: "0.85rem",
              color: "#333",
            }}
          >
            <code>{JSON.stringify(user, null, 2)}</code>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
