import Home from "../src/screens/home";
import { render } from "@testing-library/react-native";

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe("home component test", () => {
  jest.useFakeTimers();
  it("take snap shot", () => {
    render(<Home />);
  });
});
