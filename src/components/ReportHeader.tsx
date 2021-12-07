import React from 'react';
import { ReportData } from './typings';
import { ReportTitle } from './ReportTitle';
import { ReportTimestamp } from './ReportTimestamp';
import { ReportBanner } from './ReportBanner';

export type ReportHeaderProps = {
  data: ReportData;
};

export const ReportHeader = (props: ReportHeaderProps) => {
  const { data } = props;

  return (
    <>
      <ReportTitle fileName={data?.sourceFilesInfo?.fileName}></ReportTitle>
      <ReportTimestamp timestamp={data?.context?.timestamp}></ReportTimestamp>

      {/* Todo: Will need toggle banner filesTabOpen when tab changes  */}
      <ReportBanner
        filesTabOpen={true}
        fileRecords={data?.filerecords}
        filesProcessed={data?.sourceFilesInfo?.Files}
      ></ReportBanner>

      {/* Todo: Add ReportDebugIds */}
    </>
  );
};
