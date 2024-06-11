import React, { useState } from "react";
import { Container, Input, Button, VStack, HStack, Text, Image, Box } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const API_KEY = "YOUR_TMDB_API_KEY"; // Replace with your TMDb API key

const Index = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    if (query.trim() === "") return;

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Search for a movie..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button onClick={searchMovies} leftIcon={<FaSearch />}>
            Search
          </Button>
        </HStack>
        <VStack spacing={4} width="100%">
          {movies.map((movie) => (
            <Box key={movie.id} borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%">
              <HStack>
                <Image src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} boxSize="100px" objectFit="cover" />
                <VStack align="start" spacing={1} padding={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    {movie.title}
                  </Text>
                  <Text fontSize="sm">{movie.release_date}</Text>
                  <Text fontSize="sm">{movie.overview}</Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
