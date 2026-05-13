import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import { CartProvider } from "./contexts/CartContext";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/cart"} component={Cart} />
      <Route path={"/checkout"} component={Checkout} />

      {/* NOVAS ROTAS */}
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />

      <Route path={"/404"} component={NotFound} />

      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Header />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;