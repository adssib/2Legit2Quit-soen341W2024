# Import PDF Stuff
from django.http import FileResponse
import io
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import letter
import os


def generate_rental_agreement_pdf(file_path):
    # Create a canvas
    c = canvas.Canvas(file_path, pagesize=letter)

    # Set font and font size
    c.setFont("Helvetica", 12)

    # Define the content
    content = [
        "",
        "",
        "Rental Agreement",
        "",
        "1. Renter's Information:",
        "Name: _______________________",
        "Address: _______________________",
        "Contact Number: _______________________",
        "Email Address: _______________________",
        "Driver's License Number: _______________________",
        "",
        "2. Vehicle Information:",
        "Make: _______________________",
        "Model: _______________________",
        "Year: _______________________",
        "License Plate Number: _______________________",
        "Vehicle Identification Number (VIN): _______________________",
        "Color: _______________________",
        "",
        "3. Rental Details:",
        "Rental Start Date: _______________________",
        "Rental End Date: _______________________",
        "Pick-up Location: _______________________",
        "Drop-off Location: _______________________",
        "Rental Period: _______________________",
        "Mileage Limit (if applicable): _______________________",
        "Rental Rate: _______________________",
        "Additional Services (if any): _______________________",
        "",
        "4. Rental Terms and Conditions:",
        "- The Renter acknowledges receiving the vehicle described above in good condition and ",
        "agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.",
        "",
        "- The Renter agrees to use the vehicle solely for personal or business purposes and not for ",
        "any illegal activities.",
        "",
        "- The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental",
        " period. Additional charges may apply for exceeding the mileage limit, late returns, ",
        "fuel refueling, or other damages.",
        "",
        "- The Renter agrees to bear all costs associated with traffic violations, tolls,",
        "and parking fines incurred during the rental period.",
        "",
        "- The Renter acknowledges that they are responsible for any loss or damage to the vehicle,",
        "including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental ",
        "Company for all repair or replacement costs.",
        "",
        "- The Renter agrees to return the vehicle to the designated drop-off location at the ",
        "agreed-upon date and time. Failure to do so may result in additional charges.",
        "",
        "- The Rental Company reserves the right to terminate this agreement and repossess the ",
        "vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.",
        "",
        "",
        "",
        "- The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance ",
        "coverage and agrees to comply with all insurance requirements during the rental period.",

        "",
        "5. Indemnification:",
        "The Renter agrees to indemnify and hold harmless the Rental Company, its employees,",
        " agents, and affiliates from any claims, liabilities, damages, or expenses arising ",
        "out of or related to the Renter's use of the vehicle.",

        "",
        "6. Governing Law:",
        "This Agreement shall be governed by and construed in accordance with the laws of"
        "[Jurisdiction]. Any disputes arising under or related to this Agreement shall be"
        "resolved exclusively by the courts of [Jurisdiction].",
        "",
        "7. Entire Agreement:",
        "This Agreement constitutes the entire understanding between the parties concerning",
        "the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.",
        "",
        "8. Signatures:",
        "The parties hereto have executed this Agreement as of the date first written above.",
        "",
        "Rental Company:",
        "Signature: _______________________",
        "Print Name: _______________________",
        "Date: _______________________",
        "",
        "Renter:",
        "Signature: _______________________",
        "Print Name: _______________________",
        "Date: _______________________",
    ]

 # Set initial y-coordinate
    y = inch * 11

    # Set maximum lines per page
    max_lines_per_page = 45

    # Write content to the canvas
    for line in content:
        c.drawString(inch, y, line)
        y -= 15  # Move to the next line

        # Check for page break
        if y < 0:
            c.showPage()  # Start a new page
            c.setFont("Helvetica", 12)  # Reset font
            y = inch * 11  # Reset y-coordinate

    # Save the PDF
    c.save()
# Specify the file path
file_path = "../static/receipt/rental_agreement.pdf"

# Generate the PDF
generate_rental_agreement_pdf(file_path)

# Print confirmation message
print(f"PDF saved to: {file_path}")

    # Return the PDF file as response
    # return FileResponse(buf, as_attachment=True, filename='poato.pdf')
