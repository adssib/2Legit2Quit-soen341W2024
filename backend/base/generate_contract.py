# # Import PDF Stuff
# from django.http import FileResponse
# import io
# from reportlab.pdfgen import canvas
# from reportlab.lib.units import inch
# from reportlab.lib.pagesizes import letter
# import os

# from django.core.mail import EmailMessage

# def generate_rental_agreement_pdf_and_send_email(file_path, user, reservation):
#     # Create a canvas
#     c = canvas.Canvas(file_path, pagesize=letter)

#     # Set font and font size
#     c.setFont("Helvetica", 12)

#     # Define the content
#     content = [
#     "",
#     "",
#     "Rental Agreement",
#     "",
#     f"1. Renter's Information:",
#     f"Name: {user.name}",
#     f"Email Address: {user.email}",
#     f"Driver's License Number: ASID12313INADIAW",
#     "",
#     "2. Vehicle Information:",
#     f"Name: {reservation.product.name}",
#     f"Brand: {reservation.product.brand}",
#     f"License Plate Number: X6N 3D7",
#     f"Vehicle Identification Number (VIN): 3131344214",
#     "",
#     "3. Rental Details:",
#     f"Rental Start Date: {reservation.start_date}",
#     f"Rental End Date: {reservation.end_date}",
#     # f"Pick-up Location: {reservation.product.pickup_location}",
#     # f"Drop-off Location: {reservation.product.dropoff_location}",
#     "4. Rental Terms and Conditions:",
#         "- The Renter acknowledges receiving the vehicle described above in good condition and ",
#         "agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.",
#         "",
#         "- The Renter agrees to use the vehicle solely for personal or business purposes and not for ",
#         "any illegal activities.",
#         "",
#         "- The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental",
#         " period. Additional charges may apply for exceeding the mileage limit, late returns, ",
#         "fuel refueling, or other damages.",
#         "",
#         "- The Renter agrees to bear all costs associated with traffic violations, tolls,",
#         "and parking fines incurred during the rental period.",
#         "",
#         "- The Renter acknowledges that they are responsible for any loss or damage to the vehicle,",
#         "including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental ",
#         "Company for all repair or replacement costs.",
#         "",
#         "- The Renter agrees to return the vehicle to the designated drop-off location at the ",
#         "agreed-upon date and time. Failure to do so may result in additional charges.",
#         "",
#         "- The Rental Company reserves the right to terminate this agreement and repossess the ",
#         "vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.",
#         "",
#         "",
#         "",
#         "- The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance ",
#         "coverage and agrees to comply with all insurance requirements during the rental period.",

#         "",
#         "5. Indemnification:",
#         "The Renter agrees to indemnify and hold harmless the Rental Company, its employees,",
#         " agents, and affiliates from any claims, liabilities, damages, or expenses arising ",
#         "out of or related to the Renter's use of the vehicle.",

#         "",
#         "6. Governing Law:",
#         "This Agreement shall be governed by and construed in accordance with the laws of"
#         "[Jurisdiction]. Any disputes arising under or related to this Agreement shall be"
#         "resolved exclusively by the courts of [Jurisdiction].",
#         "",
#         "7. Entire Agreement:",
#         "This Agreement constitutes the entire understanding between the parties concerning",
#         "the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.",
#         "",
#         "8. Signatures:",
#         "The parties hereto have executed this Agreement as of the date first written above.",
#         "",
#         "Rental Company:",
#         "Signature: _______________________",
#         "Print Name: _______________________",
#         "Date: _______________________",
#         "",
#         "Renter:",
#         "Signature: _______________________",
#         "Print Name: _______________________",
#         "Date: _______________________",
#     ]

#     # Set initial y-coordinate
#     y = inch * 11

#     # Set maximum lines per page
#     max_lines_per_page = 45

#     # Write content to the canvas
#     for line in content:
#         c.drawString(inch, y, line)
#         y -= 15  # Move to the next line

#         # Check for page break
#         if y < 0:
#             c.showPage()  # Start a new page
#             c.setFont("Helvetica", 12)  # Reset font
#             y = inch * 11  # Reset y-coordinate

#     # Save the PDF
#     c.save()

#     # Send email with the PDF attachment
#     email_subject = 'Rental Agreement Details'
#     email_body = 'Please find attached the rental agreement details.'
#     email_from = 'your_email@example.com'  # Change this to your email
#     email_to = [user.email]

#     email = EmailMessage(email_subject, email_body, email_from, email_to)
#     email.attach_file(file_path)
#     email.send()