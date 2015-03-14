package it.ale.model;

import java.io.StringReader;
import java.io.UnsupportedEncodingException;

import org.apache.commons.codec.binary.Base64;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonReader;

public class MessageModel {
    private String message;
    private String subscription;

    public String getMessage() {
        return message;
    }

    public String getSubscription() {
        return subscription;
    }

    public MessageModel(String pubSubMessageJSON) {
        // TODO Auto-generated constructor stub
        JsonParser parser = new JsonParser();
        JsonReader reader = new JsonReader(new StringReader(pubSubMessageJSON));
        reader.setLenient(true);

        JsonObject obj = parser.parse(reader).getAsJsonObject();
        try {
            this.message = new String(Base64.decodeBase64(obj.get("message").getAsJsonObject().get("data").getAsString()), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            this.message = "Errore nella decodifica del messaggio";
        }

        String sub = obj.get("subscription").getAsString();

        this.subscription = sub.substring(sub.lastIndexOf("/"));
    }

    public String toJSON() {
        // TODO Auto-generated method stub
        return new Gson().toJson(this);
    }
}
