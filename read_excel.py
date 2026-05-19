import openpyxl

file_path = "C:/Users/gadde/OneDrive/Desktop/to abhi lash.xlsx"
try:
    wb = openpyxl.load_workbook(file_path)
    sheet = wb.active
    print(f"Sheet Title: {sheet.title}")
    
    # Print first 20 rows to avoid clutter
    count = 0
    for row in sheet.iter_rows(values_only=True):
        if any(row): # Skip empty rows
            print(row)
            count += 1
        if count >= 20:
            break
except Exception as e:
    print("Error:", e)
