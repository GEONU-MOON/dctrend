import { useCallback } from "react";

const useCleanHTML = () => {
  const stripImagesAndFigcaptionAndFigure = useCallback((htmlContent) => {
    let contentWithoutImages = htmlContent.replace(/<img[^>]*>/g, "");
    let contentWithoutFigcaption = contentWithoutImages.replace(
      /<figcaption[^>]*>(.*?)<\/figcaption>/gi,
      ""
    );
    return contentWithoutFigcaption.replace(
      /<figure[^>]*>[\s\S]*?<\/figure>/gi,
      ""
    );
  }, []);

  const stripTags = useCallback((htmlContent, tagToRemove) => {
    const tagPattern = new RegExp(
      `<${tagToRemove}[^>]*>(.*?)<\/${tagToRemove}>`,
      "gi"
    );
    return htmlContent.replace(tagPattern, "");
  }, []);

  const parseTableData = useCallback((htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const table = doc.querySelector("table");

    if (!table) return htmlContent;

    let formattedData = "";

    const rows = table.querySelectorAll("tr");
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll("td");
      if (cells.length === 6 && rowIndex > 0) {
        formattedData += `
          주요도시: ${cells[0].innerText.trim()} - 기온: ${cells[1].innerText.trim()} - 날씨: ${cells[2].innerText.trim()}<br/>
          주요도시: ${cells[3].innerText.trim()} - 기온: ${cells[4].innerText.trim()} - 날씨: ${cells[5].innerText.trim()}<br/><br/>
        `;
      }
    });

    return formattedData;
  }, []);

  const cleanHTMLContent = useCallback(
    (htmlContent) => {
      let cleanedContent = stripImagesAndFigcaptionAndFigure(htmlContent);
      cleanedContent = stripTags(cleanedContent, "h2");
      cleanedContent = parseTableData(cleanedContent);
      return cleanedContent;
    },
    [stripImagesAndFigcaptionAndFigure, stripTags, parseTableData]
  );

  return { cleanHTMLContent };
};

export default useCleanHTML;
