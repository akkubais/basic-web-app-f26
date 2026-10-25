import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "Abdulaziz"
          ));
    })

    test('should return Andrew ID', () => {
        const query = "What is your Andrew ID?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("akkubais");
    })

    test('should return GitHub username', () => {
        const query = "What is your GitHub username?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("akkubais");
    })

    test('should return GitHub repository', () => {
        const query = "What is your GitHub repository?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("https://github.com/akkubais/basic-web-app-f26");
    })
});
