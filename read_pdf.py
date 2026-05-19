import PyPDF2

pdf_path = 'C:/Users/gadde/Downloads/Orniva D S/Protf-refers/Portfolio.pdf'
try:
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text() + '\n'
        print('--- PDF START ---')
        print(text[:4000]) # Print first 4000 chars to avoid overload
        print('--- PDF END ---')
except Exception as e:
    print('Error:', e)
