import Document, { DocumentContext, DocumentInitialProps } from "next/document";
<%- _document.import.join("\n") %>

class CustomDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    <%- _document.initialProps.join("\n") %>
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
}

export default CustomDocument