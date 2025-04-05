import { Box, Avatar, Typography, Stack } from "@mui/material";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

interface Props {
  cast: CastMember[];
  imageBaseUrl: string;
}

export function CastList({ cast, imageBaseUrl }: Props) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Cast
      </Typography>
      <Stack direction="row" spacing={2} sx={{ overflowX: "auto" }}>
        {cast.map((member) => (
          <Box key={member.id} sx={{ textAlign: "center" }}>
            <Avatar
              src={
                member.profile_path
                  ? `${imageBaseUrl}w185${member.profile_path}`
                  : undefined
              }
              sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}
            />
            <Typography variant="subtitle2">{member.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {member.character}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
