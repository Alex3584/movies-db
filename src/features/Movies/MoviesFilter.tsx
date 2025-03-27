import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Skeleton,
  TextField,
  debounce,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useMemo, useState } from "react";
import { KeywordItem } from "../../services/tmdb";
import { Controller, useForm } from "react-hook-form";
import { useGetGenresQuery, useGetKeywordsQuery } from "../../services/tmdb";

export interface Filters {
  keywords: KeywordItem[];
  genres: number[];
}

interface MoviesFilterProps {
  onApply(filters: Filters): void;
}

export function MoviesFilter({ onApply }: MoviesFilterProps) {
  const [keywordsQuery, setKeywordsQuery] = useState<string>("");
  const { data: keywordsOptions = [], isLoading: keywordsLoading } = useGetKeywordsQuery(keywordsQuery, { skip: !keywordsQuery });
  const { data: genres = [], isLoading: genresLoading } = useGetGenresQuery();

  const { control, handleSubmit, formState } = useForm<Filters>({
    defaultValues: {
      keywords: [],
      genres: [],
    },
  });

  const debouncedFetchKeywordsOptions = useMemo(
    () =>
      debounce((query: string) => {
        setKeywordsQuery(query);
      }, 1000),
    []
  );

  return (
    <Paper sx={{ m: 2, p: 0.5 }}>
      <form onSubmit={handleSubmit(onApply)}>
        <FormControl sx={{ m: 2, display: "block" }} component="fieldset" variant="standard">
          <Controller
            name="keywords"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                loading={keywordsLoading}
                disablePortal
                options={keywordsOptions}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => onChange(value)}
                value={value}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onInputChange={(_, value) => debouncedFetchKeywordsOptions(value)}
                renderInput={(params) => <TextField {...params} label="Keywords" />}
              />
            )}
          />
        </FormControl>
        <FormControl sx={{ m: 2, display: "block" }} component="fieldset" variant="standard">
          {genresLoading ? (
            <Skeleton width={300} height={480} />
          ) : (
            <>
              <FormLabel component="legend">Genres</FormLabel>
              <FormGroup sx={{ maxHeight: 500 }}>
                <Controller
                  name="genres"
                  control={control}
                  render={({ field }) => (
                    <>
                      {genres.map((genre) => (
                        <FormControlLabel
                          key={genre.id}
                          control={
                            <Checkbox
                              value={genre.id}
                              checked={field.value.includes(genre.id)}
                              onChange={(event, checked) => {
                                const valueNumber = Number(event.target.value);
                                if (checked) {
                                  field.onChange([...field.value, valueNumber]);
                                } else {
                                  field.onChange(field.value.filter((value) => value !== valueNumber));
                                }
                              }}
                            />
                          }
                          label={genre.name}
                        />
                      ))}
                    </>
                  )}
                />
              </FormGroup>
            </>
          )}
        </FormControl>
        <Button type="submit" sx={{ m: 2 }} variant="contained" startIcon={<FilterAltOutlinedIcon />} disabled={!formState.isDirty}>
          Apply filter
        </Button>
      </form>
    </Paper>
  );
}
