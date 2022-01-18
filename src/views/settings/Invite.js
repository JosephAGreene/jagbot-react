import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Invite (props) {
  const {selectedBot} = props;
  const history = useHistory();
  const inviteLink = `https://discord.com/oauth2/authorize?client_id=${selectedBot.botId}&permissions=8&scope=bot`;

  React.useEffect(() => {
    window.open(inviteLink, "_blank");
    history.goBack();
  }, [history, inviteLink])

  return null;
}