package it.ale.model;

import java.util.ArrayList;
import java.util.List;

import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;

public class ChannelModel {
    private String channelID;
    private String token;

    public ChannelModel() {
        // TODO Auto-generated constructor stub
    }

    public ChannelModel(String channelID, String token) {
        // TODO Auto-generated constructor stub
        this.channelID = channelID;
        this.token = token;
    }

    public String getChannelID() {
        return channelID;
    }

    public void setChannelID(String channelID) {
        this.channelID = channelID;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public ChannelModel(Entity e) {
        // TODO Auto-generated constructor stub
        this.channelID = (String) e.getProperty("channelID");
        this.token = (String) e.getProperty("token");
    }

    public void save() {
        // TODO Auto-generated method stub
        DatastoreServiceFactory.getDatastoreService().put(toEntity());
    }

    private Entity toEntity() {
        Entity e = new Entity(this.getClass().getName());
        e.setProperty("channelID", this.channelID);
        e.setProperty("token", this.token);

        return e;
    }

    public static List<ChannelModel> list() {
        // TODO Auto-generated method stub
        List<ChannelModel> tss = new ArrayList<ChannelModel>();

        Iterable<Entity> tsse = DatastoreServiceFactory.getDatastoreService().prepare(new Query(ChannelModel.class.getName())).asIterable();
        for (Entity e : tsse) {
            tss.add(new ChannelModel(e));
        }

        return tss;
    }

}
