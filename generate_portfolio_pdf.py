import weasyprint
import os

def generate_portfolio_pdf():
    # Get the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Path to your index.html file
    html_file = os.path.join(current_dir, 'index.html')
    
    # Output PDF file path
    pdf_file = os.path.join(current_dir, 'portfolio.pdf')
    
    # Check if HTML file exists
    if not os.path.exists(html_file):
        print(f"Error: HTML file not found at {html_file}")
        return
    
    # Generate PDF
    try:
        # Read the HTML file
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Convert HTML to PDF
        html_doc = weasyprint.HTML(string=html_content, base_url=current_dir)
        html_doc.write_pdf(pdf_file)
        
        print(f"Portfolio PDF successfully generated at: {pdf_file}")
        print(f"File size: {os.path.getsize(pdf_file) / 1024:.2f} KB")
        
    except Exception as e:
        print(f"Error generating PDF: {str(e)}")

if __name__ == "__main__":
    generate_portfolio_pdf()