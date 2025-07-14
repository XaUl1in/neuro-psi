import PyPDF2
import sys

def extract_pdf_text(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            return text
    except Exception as e:
        print(f"Erro ao ler PDF: {e}")
        return None

if __name__ == "__main__":
    pdf_path = "Portifólio_(2)[1].pdf"
    text = extract_pdf_text(pdf_path)
    if text:
        print(text)
    else:
        print("Não foi possível extrair o texto do PDF") 