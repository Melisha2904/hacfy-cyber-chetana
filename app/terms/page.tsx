import PrivacyPolicy from "./privacy-policy";
import UserTerms from "./user-terms";

export default function Page() {
    return (
        <div className="container flex flex-col items-center justify-center min-h-screen mx-auto">
            <UserTerms />
            <PrivacyPolicy />
        </div>
    );
}
