package it.ale;

import java.io.IOException;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;

@SuppressWarnings("serial")
public class Pubsub_gaeServlet extends HttpServlet {
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        ServletInputStream is = req.getInputStream();

        String payload = IOUtils.toString(is);

        IOUtils.closeQuietly(is);

        System.out.println(payload);
    }
}
