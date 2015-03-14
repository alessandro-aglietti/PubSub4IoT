package it.ale;

import it.ale.model.ChannelModel;
import it.ale.model.MessageModel;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;

import com.google.appengine.api.channel.ChannelMessage;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;

@SuppressWarnings("serial")
public class Pubsub_gaeServlet extends HttpServlet {

    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        ChannelService channelService = ChannelServiceFactory.getChannelService();
        String channelID = String.valueOf(new Date().getTime());
        String token = channelService.createChannel(channelID);

        ChannelModel channel = new ChannelModel(channelID, token);

        channel.save();

        req.setAttribute("channel", channel);

        RequestDispatcher view = req.getRequestDispatcher("/WEB-INF/view/index.jsp");

        try {
            view.forward(req, resp);
        } catch (ServletException e) {
            // TODO Auto-generated catch block
            resp.setContentType("text/plain");
            resp.getWriter().println("ServletException: " + e.getMessage());

            e.printStackTrace();
        }
    }

    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        ServletInputStream is = req.getInputStream();

        String payload = IOUtils.toString(is);

        System.out.println("payload: " + payload);

        IOUtils.closeQuietly(is);

        MessageModel msg = new MessageModel(payload);

        ChannelService channelService = ChannelServiceFactory.getChannelService();

        List<ChannelModel> channels = ChannelModel.list();
        for (ChannelModel c : channels) {
            channelService.sendMessage(new ChannelMessage(c.getChannelID(), msg.toJSON()));
        }
    }
}