package org.JKDW.files.controller;

import org.apache.commons.io.FilenameUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@RestController
public class FileUploadController {

    /**
     * we get project directory and add path to static\img path
     */
    private static String UPLOADED_FOLDER = System.getProperty("user.dir") + "\\build\\generated-web-resources\\static\\img\\";

    private boolean isDishPhoto = true;
    /**
     * Save file to static assets directory
     *
     * @param uploadfile file sent via XMLHttpRequest
     *                   see event.service.ts uploadPhoto method
     * @return Http Status
     * consumes multipart form-data are files format
     *
     * //TODO ogranicz wielksoc pliku
     */
    @RequestMapping(value = "/api/upload/photo/dish", method = RequestMethod.POST, consumes = "multipart/form-data")
    private ResponseEntity<?> uploadDishPhoto(
            @RequestParam MultipartFile uploadfile) {

        //check if file is empty
        if (uploadfile.isEmpty()) {
            return new ResponseEntity("please select a file!", HttpStatus.NOT_FOUND);
        }

        //try to write a file
        try {
            isDishPhoto = true;
            saveUploadedFiles(Arrays.asList(uploadfile), "dish\\");//pass \\dish for dish photos
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity("Successfully uploaded - " +
                uploadfile.getOriginalFilename(), new HttpHeaders(), HttpStatus.OK);
    }

    /**
     * Tries to save uploaded files
     *
     * @param files          list of files
     * @param additionalPath set this to make additional directory i.e.
     *                       \\dish for event dish photos or \\profile for profile photos
     * @throws IOException error in writing to a file
     */
    private void saveUploadedFiles(List<MultipartFile> files, String additionalPath)
            throws IOException, IllegalArgumentException {
        //create directory if doesn't exist
        File directory = new File(UPLOADED_FOLDER + additionalPath);
        if (!directory.exists()) {
            directory.mkdirs();
            // If you require it to make the entire directory path including parents,
            // use directory.mkdirs(); here instead.
        }

        //save file(s)
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue; //next pls
            }
            //back-end checking extension
            checkFiletype(file.getOriginalFilename());

            //save file in assets dir
            byte[] bytes = file.getBytes();
            Path path;
            if(isDishPhoto) {
                path = Paths.get(UPLOADED_FOLDER + additionalPath + file.getOriginalFilename());
                System.out.println("set path " + UPLOADED_FOLDER + additionalPath + file.getOriginalFilename());
            }
            else{
                path = Paths.get(UPLOADED_FOLDER + additionalPath + "profile1."+FilenameUtils.getExtension(file.getOriginalFilename()));
                System.out.println("set path " + UPLOADED_FOLDER + additionalPath + "profile1."+FilenameUtils.getExtension(file.getOriginalFilename()));

            }
            try {
                Files.write(path, bytes);
            } catch (IOException e) {
                e.printStackTrace();
            }

            System.out.println("file written");
        }
    }

    /**
     * Save file to static assets directory
     *
     * @return Http Status
     * consumes multipart form-data are files format
     *
     *
     **/
    @RequestMapping(value = "/api/upload/photo/{nick}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<?> uploadProfilePhoto(
            @RequestBody String data, @PathVariable("nick")String nick) throws IOException {

        //try to write a file
        data = data.replaceFirst("^data:image/[^;]*;base64,?","");
        Base64.Decoder decoder = Base64.getDecoder();
        saveUploadedPhoto(decoder.decode(data), nick+"\\profilePhoto\\");


        return new ResponseEntity<>("Successfully uploaded - profile photo", HttpStatus.OK);
    }

    private void saveUploadedPhoto(byte[] bytes, String additionalPath)
            throws IOException, IllegalArgumentException {
        //create directory if doesn't exist
        File directory = new File(UPLOADED_FOLDER + additionalPath);
        File dir = new File(UPLOADED_FOLDER);
        dir.setReadable(true);
        if (!directory.exists()) {
            directory.mkdirs();
            // If you require it to make the entire directory path including parents,
            // use directory.mkdirs(); here instead.
        }
            Path path;

                path = Paths.get(UPLOADED_FOLDER + additionalPath + "profile1.jpg");
                System.out.println("set path " + UPLOADED_FOLDER + additionalPath + "profile1.jpg");

        try (OutputStream stream = new FileOutputStream(UPLOADED_FOLDER + additionalPath + "profile1.jpg")) {
            stream.write(bytes);
        }

            System.out.println("file written");

    }

    /**
     * Backend checking of image file extensions
     *
     * @param fileName name of uploaded file
     * @throws IllegalArgumentException occurs when file has unacceptable ext.
     */
    private void checkFiletype(String fileName) throws IllegalArgumentException {
        if (!(
                fileName.endsWith(".jpg") || fileName.endsWith(".JPG")
                        || fileName.endsWith(".jpeg") || fileName.endsWith(".JPEG")
                        || fileName.endsWith(".png") || fileName.endsWith(".PNG")
                        || fileName.endsWith(".bmp") || fileName.endsWith(".BMP")
        ))
            throw new IllegalArgumentException("Unacceptable file extension");
    }

    @RequestMapping(value = "/isProfilePhotoExists/{nick}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> checkIfProfilePhotoExists(@PathVariable("nick")String nick) {
        Path path = Paths.get(UPLOADED_FOLDER + nick+"\\profilePhoto");
        return new ResponseEntity<>(isFileExist(path.toString()),HttpStatus.OK);
    }

    private Boolean isFileExist(String path){

            File file = new File(path);
            if(file.exists()) {
                File[] files = file.listFiles();
                long exists = Arrays.stream(files).map(f -> f.getName()).filter(fileName -> fileName.startsWith("profile1")).count();
                return exists > 0;
            }
            return false;

    }

}
