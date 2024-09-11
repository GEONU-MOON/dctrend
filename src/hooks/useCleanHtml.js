import { useCallback } from "react";

const useCleanHTML = () => {
  // 모든 태그를 제거하는 함수
  const stripAllTags = useCallback((htmlContent) => {
    const tagPattern = /<[^>]*>/g; // 모든 HTML 태그를 찾는 정규식
    return htmlContent.replace(tagPattern, ""); // 태그를 공백으로 교체
  }, []);

  // 테이블 데이터를 파싱하는 함수 (기존 기능 유지)
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

  // 메인 HTML 정리 함수
  const cleanHTMLContent = useCallback(
    (htmlContent) => {
      let cleanedContent = stripAllTags(htmlContent); // 모든 태그 제거
      cleanedContent = parseTableData(cleanedContent);
      return cleanedContent;
    },
    [stripAllTags, parseTableData]
  );

  return { cleanHTMLContent };
};

export default useCleanHTML;
