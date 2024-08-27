import DOMPurify from "dompurify";
import IsoDompurify from "isomorphic-dompurify";

interface Props {
  htmlContent: string;
  className?: string;
  isIsoMorphic?: boolean;
}

const DangerousHtmlComponent = ({
  isIsoMorphic,
  htmlContent,
  ...props
}: Props) => {
  const sanitizedHtmlContent = isIsoMorphic
    ? IsoDompurify.sanitize(htmlContent)
    : DOMPurify.sanitize(htmlContent);

  return (
    <div
      className=""
      {...props}
      dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
    />
  );
};

export default DangerousHtmlComponent;
