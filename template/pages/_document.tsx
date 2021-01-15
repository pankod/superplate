import Document, { DocumentContext } from 'next/document'
<%- _document.import.join("\n") %>

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    <%- _document.initialProps.join("\n") %>
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
}

export default CustomDocument