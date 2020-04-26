export default {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/server"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    // testRegex: "(./tests/.*|(\\.|/)(test|spec))\\.tsx?$",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
