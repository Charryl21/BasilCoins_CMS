﻿using InSys.Context;
using InSys.Helper;
using InSys.ITI.Models.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace InSys.ITI.BloodType
{
    public class BloodTypeDb: InSysContext
    {
        public BloodTypeDb(BrowserSession Session) : base(Session)
        {
            this.SessionContext = Session;
        }

        public DbQuery<CountData> CountData { get; set; }
        public DbSet<tBloodType> tBloodType { get; set; }
    }
}
