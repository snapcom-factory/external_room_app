import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";
import { createContext, useEffect, useState } from "react";
import { getKeycloakURL } from "./api";


const keycloakConfig: KeycloakConfig = {
  realm: 'magnify',
  clientId: 'magnify-front',
};

/**
 * KeycloakInitOptions configures the Keycloak client.
 */
const keycloakInitOptions: KeycloakInitOptions = {
  // Configure that Keycloak will check if a user is already authenticated (when opening the app or reloading the page). If not authenticated the user will be send to the login form. If already authenticated the webapp will open.
  onLoad: "login-required",
};

// Create the Keycloak client instance
// const keycloak = new Keycloak(keycloakConfig);

/**
 * AuthContextValues defines the structure for the default values of the {@link AuthContext}.
 */
interface AuthContextValues {
  /**
   * Whether or not a user is currently authenticated
   */
  isAuthenticated: boolean;
  /**
   * The name of the authenticated user
   */
  username: string;
  /**
   * Function to initiate the logout
   */
  logout: () => void;
  /**
   * Check if the user has the given role
   */
  hasRole: (role: string) => boolean;

  isAdmin: boolean;

  error?: string | null;
}

/**
 * Default values for the {@link AuthContext}
 */
const defaultAuthContextValues: AuthContextValues = {
  isAuthenticated: false,
  username: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => { },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasRole: (_role) => false,

  isAdmin: false,
};

/**
 * Create the AuthContext using the default values.
 */
export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextValues
);

/**
 * The props that must be passed to create the {@link AuthContextProvider}.
 */
interface AuthContextProviderProps {
  /**
   * The elements wrapped by the auth context.
   */
  children: JSX.Element;
}

/**
 * AuthContextProvider is responsible for managing the authentication state of the current user.
 *
 * @param props
 */
const AuthContextProvider = (props: AuthContextProviderProps) => {
  console.log("rendering AuthContextProvider");

  // Create the local state in which we will keep track if a user is authenticated
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  // Local state that will contain the users name once it is loaded
  const [username, setUsername] = useState<string>("");

  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const [error, setError] = useState<string>("")

  const [keycloak, setKeycloak] = useState<Keycloak>();

  useEffect(() => {
    getKeycloakURL().then((url) => {
      setKeycloak(new Keycloak({ ...keycloakConfig, url }))
    })
  }, []);

  // Effect used to initialize the Keycloak client. It has no dependend to base url availability.
  useEffect(() => {
    /**
     * Initialize the Keycloak instance
     */
    async function initializeKeycloak() {
      console.log("initialize Keycloak");
      try {
        const isAuthenticatedResponse = await keycloak?.init(
          keycloakInitOptions
        );

        // If the authentication was not successfull the user is send back to the Keycloak login form
        if (!isAuthenticatedResponse) {
          const notAuthenticatedMessage = "user is not yet authenticated. forwarding user to login."
          console.log(notAuthenticatedMessage);
          setError(notAuthenticatedMessage);
          keycloak?.login();
        }
        // If we get here the user is authenticated and we can update the state accordingly
        console.log("user already authenticated");
        setAuthenticated(isAuthenticatedResponse || false);
      } catch {
        const initErrorMessage = "error initializing Keycloak"
        console.log(initErrorMessage);
        setError(initErrorMessage)
        setAuthenticated(false);
      }
    }

    initializeKeycloak();

  }, [keycloak]);

  // This effect loads the users profile in order to extract the username
  useEffect(() => {
    /**
     * Load the profile for of the user from Keycloak
     */
    async function loadProfile() {
      try {
        const profile = await keycloak?.loadUserProfile();
        if (profile?.firstName) {
          setUsername(profile.firstName);
        } else if (profile?.username) {
          setUsername(profile.username);
        }
      } catch {
        const userProfileLoadingErrorMessage = "error trying to load the users profile"
        console.log(userProfileLoadingErrorMessage);
        setError(userProfileLoadingErrorMessage);
      }
    }

    // Only load the profile if a user is authenticated
    if (isAuthenticated) {
      loadProfile();

      //
      setIsAdmin(keycloak?.hasRealmRole("admin") ? true : false)
    }
  }, [isAuthenticated, keycloak]);

  /**
   * Initiate the logout
   */
  const logout = () => {
    keycloak?.logout();
  };

  /**
   * Check if the user has the given role
   * @param role to be checked
   * @returns whether or not if the user has the role
   */
  const hasRole = (role: string) => {
    return keycloak?.hasRealmRole(role) || false;
  };

  // Setup the context provider
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, logout, hasRole, isAdmin, error }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;