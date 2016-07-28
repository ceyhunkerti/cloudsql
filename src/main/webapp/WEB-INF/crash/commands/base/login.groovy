

welcome = { ->
  def hostName;
  try {
    hostName = java.net.InetAddress.getLocalHost().getHostName();
  } catch (java.net.UnknownHostException ignore) {
    hostName = "localhost";
  }
  return """\
Welcome to $hostName + !
It is ${new Date()} now
""";
}

prompt = { ->
  return "% ";
}
