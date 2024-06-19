import useService from "../../context/ServiceContext";

export default function useLogger() {
  const { request } = useService();

  const pushLogs = async ({
    data,
    key1,
    key2,
    metric
  }) => {
    await request(
      'post',
      '/api/app/monitor/log',
      {
        data,
        key1,
        key2,
        metric
      }
    )
  }

  const pushEvents = async ({
    data,
    name,
    city,
    action,
  }) => {
    await request(
      'post',
      '/api/app/monitor/event',
      {
        data,
        name,
        city,
        action,
      }
    )
  }

  return { pushLogs, pushEvents };
}
