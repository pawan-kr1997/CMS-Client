import MultiStepForm from "@/components/form/MultiStepForm";
import { Suspense } from "react";

const NewEntryPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MultiStepForm />
    </Suspense>
  );
};
export default NewEntryPage;
