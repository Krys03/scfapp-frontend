import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../auth/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("adminpass");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/app";

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password); // doit gérer l’appel POST /auth/login en interne
      toast({ title: "Connecté", status: "success" });
      navigate(from, { replace: true });
    } catch (err) {
      toast({
        title: "Échec de connexion",
        description: err?.message || "Vérifie tes identifiants",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box py={{ base: 10, md: 16 }}>
      <Card maxW="md" mx="auto">
        <CardHeader>
          <Heading size="md">Se connecter</Heading>
        </CardHeader>
        <CardBody>
          <Box as="form" onSubmit={onSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nom d’utilisateur</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  placeholder="admin"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Mot de passe</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="adminpass"
                  />
                  <InputRightElement>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShow((s) => !s)}
                      aria-label={show ? "Masquer" : "Afficher"}
                    >
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                variant="neo"
                isLoading={loading}
              >
                Se connecter
              </Button>
            </Stack>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
