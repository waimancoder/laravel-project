import axios from "axios";
import { createMachine, interpret } from "xstate";

const validateEmail = (_context: any, event: { email: string }) => {
    // Perform email format validation here
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(event.email)) {
        console.error("Invalid email format");
        // You can also send an event to the machine to handle the invalid email format
    }
};

const authenticate = async (
    _context: any,
    event: { email: string; password: string }
) => {
    await axios.post("http:localhost/api/login", {
        email: event.email,
        password: event.password,
    });
};
export const Login = () =>
    createMachine(
        {
            /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgDkB7AFwEEBXK7MfK3TdKyAYgGUr0ATrQZMWbDrgr4A2gAYAuolAAHCrFyspSkAA9EAWgBMAFhLHjANguyAHDYCMFgOyz7AZhsBWADQgAnoiGsgCcJE6ebp7BnsbBFtHGnoYAvsm+aFh4hKT0jMys7Kz4UFwQUmAkBABuFADWFRk4BMQkuaIFEsUI1RSFkjIKcopIIKrqmvjaegietiRJFvY25jaysotOvgEI7qbG4YaGi55O9omp6RhN2a0i+eJFJWACAhQCJMoANhwAZm+oJEaWRabXufS6PT6UiGQ20Yw0-SmiGChhI9icNmCbicTjcFn2NhxWwM9hOJDcwWCxjsxncyzs9guICBzRydzEhW4ABkKFAKAxYSN4RMkTMzmELHjlviLDFZD5-AYgp4SDZFuZwnYTp4YkyWTdQRyJFIAGLoXCfbgAJTAVAEfkNHQmgpUagRWhG0yWKspTmCTkW0QDFkMNmJCDcJGCsliauWTkO63iTlSaRA+AoEDg2n1xDhbpFnpJtKj4Vk4VibnMhg84aMWPJ+3shns0c8zfcequwNIlGEeSNnAg+fGiKLCH0Df9swrWOrePDkejsQTCaxtiisq7mVZtwHToIUBH7sm49DTijxjcNdxi3cuPD6IsaJMWKraxbJ231xB7KdkGPQtQGmWV7BII43EcRxZQDQxgkXKMY39Qw1zcDc4k8b8ez3doHn6M0LQAoUCzHYDEDca8SHVCIdRDUMlmMOsOzCSx7Cg2lgi8KlU2SIA */
            states: {
                NotAuthenticated: {
                    on: {
                        StartAuthentication: "Authenticating",
                    },
                },

                Authenticating: {
                    invoke: {
                        src: async (context, event) => {
                            const response = await axios.post(
                                "http://api.localhost/api/login",
                                {
                                    email: event.email,
                                    password: event.password,
                                }
                            );
                            console.log(response.data);
                            localStorage.setItem("token", response.data.token);
                            return response.data;
                        },
                        onError: "NotAuthenticated",
                        onDone: {
                            target: "Authenticated",
                        },
                    },
                },

                Authenticated: {
                    on: {
                        Logout: "NotAuthenticated",
                    },
                },

                AuthenticationFailed: {
                    on: {
                        RetryAuthentication: "Authenticating",
                    },
                },
            },

            initial: "NotAuthenticated",
        } /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EADOgCeg5OORA */
    );
