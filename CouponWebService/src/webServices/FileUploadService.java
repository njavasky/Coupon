package webServices;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;



@Path("/files")
	
	
	public class FileUploadService {  
		@Context
	HttpServletRequest req;
	@Context
	HttpServletResponse res;
		
	@POST
	@Path("/company/upload/{title}")
	    @Consumes(MediaType.MULTIPART_FORM_DATA)  
	    public Response uploadFile(  
	            @FormDataParam("file") InputStream uploadedInputStream,  
			@FormDataParam("file") FormDataContentDisposition fileDetail, @PathParam("title") String title) {

		String extension = getFileExtension(fileDetail.getFileName());

		String fileLocation = "c:/images/" + title + extension;
	                    //saving file  
	            try {  
	                FileOutputStream out = new FileOutputStream(new File(fileLocation));  
	                int read = 0;  
	                byte[] bytes = new byte[1024];  
	                out = new FileOutputStream(new File(fileLocation));  
	                while ((read = uploadedInputStream.read(bytes)) != -1) {  
	                    out.write(bytes, 0, read);  
	                }  
	                out.flush();  
	                out.close();  
	            } catch (IOException e) {e.printStackTrace();}  
	            String output = "File successfully uploaded to : " + fileLocation;  
	            return Response.status(200).entity(output).build();  
	    }  

	@DELETE
	@Path("/company/delete/{title}")
	public void deleteImage(@PathParam("title") String title) throws IOException {
		java.nio.file.Path path1 = Paths.get("c:/images/" + title);
		try {
			Files.deleteIfExists(path1);
		} catch (IOException e) {
			res.sendError(550);
		}

	}

	@GET
	@Path("/customer/download/{title}")
	@Produces("image/jpg")
	public File download(@PathParam("title") String title) {
		File file = new File("c:/images/" + title);
		return file;
	}

	// Returns the file extension to add to the title
	private String getFileExtension(String fileName) {

		String extension = "";
		int i = fileName.lastIndexOf('.');
		if (i > 0) {
			extension = fileName.substring(i);
		}
		return extension;
	}
}
